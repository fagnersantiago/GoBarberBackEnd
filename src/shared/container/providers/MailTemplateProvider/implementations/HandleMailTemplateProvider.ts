import handlesbar from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseEmailTemplate';
import IMailTemplateProider from '../models/IMailTemplateProvider';
import fs from 'fs';

class HandlebarMailTemplateProvider implements IMailTemplateProider{
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string>{
        const templateFileContent = await fs.promises.readFile(file,{
           encoding: 'utf-8', 
        })
        const parseTemplate = handlesbar.compile(templateFileContent);
        return parseTemplate (variables);
    }
}

export default HandlebarMailTemplateProvider;

