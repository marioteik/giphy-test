import { IGitHubUser } from "./redux/IAppState";

interface IFork {
    comments: number;
    comments_url: string;
    commits_url: string;
    created_at: string;
    description: string;
    files: {}
    forks_url: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    id: string;
    node_id: string;
    owner: IGitHubUser;
    public: string;
    updated_at: string;
    url: string;
    user: null
}

export default IFork;