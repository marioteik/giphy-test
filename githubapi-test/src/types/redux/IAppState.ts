export interface IGitHubUser {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    score?: number;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

export interface IGitHubUserGistFile {
    filename: string;
    language: string;
    raw_url: string;
    size: number;
    type: string;
}

export interface IGitHubUserGist {
    comments: number;
    comments_url: string;
    commits_url: string;
    created_at: string;
    description: string;
    files: {
        [key: string]: IGitHubUserGistFile
    };    
    forks_url: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    id: string;
    node_id: string;
    owner: IGitHubUser;
    public: boolean;
    truncated: boolean;
    updated_at: string;
    url: string;
    user: null;
}

export interface IUserResponse {
    incomplete_results?: boolean;
    items: Array<IGitHubUser>;
    total_count?: 1;
    loadingUsers: boolean;
}

export interface IUserGistResponse {
    items: Array<IGitHubUserGist>;
    loadingUserGists: boolean;
}

export default interface IAppState {
    selectedUser: IGitHubUser;
    users: IUserResponse;
    gists: IUserGistResponse;
}