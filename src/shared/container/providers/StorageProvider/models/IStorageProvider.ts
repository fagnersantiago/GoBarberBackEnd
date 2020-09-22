export default interface IStorageProvidern{
    saveFile(file: string): Promise<string>
    deleteFile(file:string): Promise<void>
}