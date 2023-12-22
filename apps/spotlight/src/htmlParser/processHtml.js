import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';

const htmlFilePath = path.join(process.cwd(), 'form-input.html');
const defaultOutputFileName = 'form-field-output.json';
const outputFileName = process.argv[2] || defaultOutputFileName;
const outputJsonPath = path.join(process.cwd(), outputFileName);

function extractFormFields(htmlContent) {
    const $ = load(htmlContent);
    let formFields = [];

    $('input, textarea, select').each((index, element) => {
        const field = $(element);
        const label = $("label[for='" + field.attr('id') + "']").text() || 'No Label';
        
        formFields.push({
            tag: field.prop('tagName').toLowerCase(),
            type: field.attr('type'),
            name: field.attr('name'),
            id: field.attr('id'),
            value: field.attr('value'),
            label: label.trim()
        });
    });

    return formFields;
}

function processHtmlFile() {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    const formFields = extractFormFields(htmlContent);

    fs.writeFileSync(outputJsonPath, JSON.stringify(formFields, null, 2));
    console.log(`Processed HTML file. Form data written to ${outputJsonPath}`);
}

processHtmlFile();