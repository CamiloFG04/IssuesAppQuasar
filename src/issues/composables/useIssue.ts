import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from '../interfaces/issue';
// import { computed } from 'vue';

const sleep = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep();
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep();
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

interface Options {
  // autoLoad issue and comments
  autoLoad?: boolean;
}

const useIssue = (issueNumber: number, options?: Options) => {
  const { autoLoad = true } = options || {};
  const queryClient = useQueryClient();

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      staleTime: 1000 * 60,
      enabled: autoLoad,
    }
  );

  const commentQuery = useQuery(
    ['issue', issueNumber, 'comment'],
    () => getComments(issueNumber),
    // () => getComments(issueQuery.data.value?.number || 0),
    {
      staleTime: 1000 * 15,
      enabled: autoLoad,
      // enabled: computed(() => !!issueQuery.data.value),
    }
  );

  const prefetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60,
      }
    );

    queryClient.prefetchQuery(
      ['issue', issueNumber, 'comment'],
      () => getComments(issueNumber),
      {
        staleTime: 1000 * 15,
      }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
    // queryClient.setQueryData(
    //   ['issue', issueNumber, 'comment'],
    //   commentQuery.data.value
    // );
  };

  return {
    issueQuery,
    commentQuery,
    prefetchIssue,
    setIssueCacheData,
  };
};

export default useIssue;
