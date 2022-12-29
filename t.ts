export function useCreateTaskAPI(
  title: string,
  startDate: Date,
  endDate: Date,
  relatedCommittees: Committee[],
): { data: Task; error: string; loaded: boolean } {
  const [data, setData] = useState<Task>({} as Task);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const server = useServer();

  useEffect(() => {
      (async () => {
          try {
              const response = await server!.post("/task/new", {
                  title,
                  startDate,
                  endDate,
                  relatedCommitteeIds: relatedCommittees.map(committee => committee.committeeId),
              });
              const task = response.data as Task;
              setData(task);
          } catch (error) {
              const msg = handleError(error);
              setError(msg);
          } finally {
              setLoaded(true);
          }
      })();
  }, []);

  return { data, error, loaded };
}

export function useGetTasksAPI(): { data: Task[]; error: string; loaded: boolean } {
  const [data, setData] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const server = useServer();

  useEffect(() => {
      (async () => {
          try {
              const response = await server!.get("/task/all");
              const allTasks = response.data.allTasks as Task[];
              setData(allTasks);
          } catch (error) {
              const msg = handleError(error);
              setError(msg);
          } finally {
              setLoaded(true);
          }
      })();
  }, []);

  return { data, error, loaded };
}