# Bulk OCR Reader
A command line app to read images of a folder or a single image and output it to a single output file.

## Dependencies
I use [Tesseract.js](https://github.com/naptha/tesseract.js) for OCR service.

## Usage
To use the app you need to create a config.json file with the following content:
```json
{
    "input": "path/to/folder/or/image/to/input",
    "output": "path/to/file/to/save/results",
    "lang": "<LANGUAGE>"
}
```
- `<LANGUAGE>` is one of [this list](https://github.com/naptha/tesseract.js/blob/master/docs/tesseract_lang_list.md)