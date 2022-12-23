import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {CliCommandInterface} from './cli-command.interface.js';
import chalk from 'chalk';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public readonly filmDataColor = chalk.hex('#7ed6a3');
  public readonly errorColor = chalk.hex('#560319');

  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(this.errorColor(`Не удалось импортировать данные из файла по причине: «${err.message}»`));
    }
  }
}
