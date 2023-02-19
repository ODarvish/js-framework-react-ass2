import chalk from "chalk";
import { exec } from "child_process";
import fs from 'fs/promises';//We can use promises her insted of line 47 to line 48
import {compareAsc, formatDistance, formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set, isFuture, isPast} from 'date-fns'
import {Command} from 'commander';
import util from 'util'
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
console.log(gitVersion);

const first = 'Ario'
const last = 'Darvish'
const name = first + last
const nam = `${chalk.bgMagentaBright(first)} ${chalk.bgCyan(last)}`
const asyncExec = util.promisify(exec);


console.log(name)
console.log(nam)

console.log(chalk.blue('Ario Darvish'))
console.log(chalk.bgMagentaBright("Ario Darvish"))
console.log(`npm & node: ${process.env.npm_config_user_agent}`)

//moved to src/getGitVersion.js to test
// const { stdout: gitVersion, stderr } = await asyncExec('git --version');
// console.log(`${gitVersion}`);

/* exec("git --version", (error, stdout, stderr) => {
 */   /*  if (error) {
        console.log(`error : ${error.massage}`);
        return;
    }
    if (studerr) {
        console.log(`studerr : ${stderr}`);
        return;
    } */
    /* console.log(`${stdout}`);
}); */

/* Create a file and write somting in it */

/* const fileContent = 'This is a sample string that will be written to the file.';

fs.writeFile('index.md', fileContent, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
}); */
const fileData = `name: ${first} ${last}
npm & node: ${process.env.npm_config_user_agent}
${gitVersion}
`;
// await fs.promises.writeFile('output/index.md', fileData);
// await fs.writeFile('output/index.md', fileData);


//play with date
console.log(format(new Date(2014, 1, 11), 'yyyy-MM-dd'))
//Calculate date distance
const startOfCourse = new Date(2023, 0, 31)
const result = formatDistanceToNow(startOfCourse)
console.log(result)

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const options = argumentParser.opts();

const dateStringSentAsArgument = argumentParser.args[0]
console.log('dateStringSentAsArgument', dateStringSentAsArgument);
if (dateStringSentAsArgument == undefined) {
  console.log('You should give a date like: "npm start --date yyyy-MM-dd" into the terminal!');
}
else {
  parse(dateStringSentAsArgument, 'yyy-MM-dd', new Date())
  const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
  const formatedNow = format(new Date(), 'yyy-MM-dd HH:mm')
  console.log('datSentAsArgument', dateSentAsArgument)
  console.log('formated date', format(dateSentAsArgument, 'yyy-MM-dd HH:mm'));
  console.log('formated date now', formatedNow);

  console.log(isAfter(dateSentAsArgument, new Date()))
  console.log(isBefore(dateSentAsArgument, new Date()))
  const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })

  console.log('isToday', isToday(dateSentAsArgument))
  console.log('isAfter', isAfter(dateSentAsArgument, currentDate))
  console.log('isBefore', isBefore(dateSentAsArgument, currentDate))
  console.log('isFuture', isFuture(dateSentAsArgument, currentDate))
  console.log('isPast', isPast(dateSentAsArgument, currentDate))

  const cssContent = `
  :root {
  font-family: Arial, Helvetica, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  html {
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #746f72;
    height: 100%;
    margin: 0;
  }

  header {
    background-color: #97ABB1;
    padding: 16px;
    text-align: center;
  }

  footer {
    background-color: #1a3942;
    color: #C2EFB3;
    padding: 16px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    padding: 16px;
  }

  .conteiner {
    background-color: #C2EFB3;
    height: fit-content;
    width: 40%;
    padding: 16px;
    margin: 16px;
    border-radius: 16px;
  }
  `;

  await fs.writeFile('output/style.css', cssContent, (err) => {
    if (err) throw err;
    console.log('The CSS file has been saved!');
  });

  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>JS-Framework ASSIGNMENT 2</title>
        </head>
        <body>
          <header>
            <h1>JS-Framwork ASSIGNMENT 2</h1>
          </header>
          <main>
            <div class="conteiner">
              <p>
                version of npm and node: ${process.env.npm_config_user_agent.slice(0, 23)}
                <br>
                ${gitVersion}
              </p>
            </div>
            <div class="conteiner">
            <p>
            How long has JS-FW course started: ${formatDistanceToNow(startOfCourse)}
            </p>
            <p>
            When this file udated: ${formatedNow}
            </p>   
            </div>
          <div class="conteiner">
            <p>Your choosen date: ${dateStringSentAsArgument}</p> 
            <p>Is it today? ${isToday(dateSentAsArgument)} </p>
            <p>Is it future? ${isAfter(dateSentAsArgument, currentDate)}</p>
            <p>Is it past? ${isBefore(dateSentAsArgument, currentDate)}</p>
          </div>
        </main>
        <footer>
        <p>Copyright &copy; 2023 ${first} ${last}'s father<p>
        </footer>
        </body>
      </html>
      `;
  
await fs.writeFile("output/index.html", htmlContent, (err) => {
    if (err) throw err;
    console.log('The HTML file has been saved!');
  });

  const fileContent = `
      Son's name: ${first} ${last}
      version of npm and node: ${process.env.npm_config_user_agent.slice(0, 23)}
      ${gitVersion}
      Your choosen date: ${dateStringSentAsArgument}
      File created/updated: ${formatedNow}
      Is it today? ${isToday(dateSentAsArgument)}
      Is it future? ${isAfter(dateSentAsArgument, currentDate)}
      Is it past? ${isBefore(dateSentAsArgument, currentDate)}
      `;

    await fs.writeFile('output/index.md', fileContent, (err) => {
    if (err) throw err;
    console.log('The MD file has been saved!');
  });
  
}