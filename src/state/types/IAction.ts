export default interface IReduxAction<T> {
    type: string;
    payload?: T | any;
}