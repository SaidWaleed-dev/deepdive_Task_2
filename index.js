#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";

const program = new Command();
const questions = [
            {
                type: 'input',
                name: 'title',
                message: "please enter course title",
            }
            ,{
                type: 'input',
                name: 'price',
                message: "please enter course price",
            }
    ]
    const filePath = './courses.json';
program
    .name('Saidoo_Courses_Manager')
    .description('CLI to Manage Saidoo Courses')
    .version('1.0.0');
// program.parse(process.argv);
program
.command('add')
.alias('a')
.description('Add a new course')
// .argument("<title>", "add course title")
// .option("--price <price>", "add course price")
.action(() => {
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Course details:', answers);
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath,  'utf-8' , (err , fileContent)  => {
                if (err) {
                    console.error('Error reading file:', err);
                    process.exit();
                }
                console.log('File content:', fileContent);
                const fileContentasJson = JSON.parse(fileContent);
                fileContentasJson.push(answers);
                fs.writeFile(filePath, JSON.stringify(fileContentasJson), `utf-8` , () => {
                console.log("course added successfully");
                });
            });
        }else{ 
                fs.writeFile(filePath, JSON.stringify([answers]), `utf-8` , () => {
                console.log("course added successfully");
        });
        }
    })
    
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        } else {
        // Something else went wrong
        }
    });
})
program 
.command('list')
.alias('l') 
.description('List all courses')
.action(() => {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
                console.error('Error reading file:', err);
                process.exit();
            }
            console.table(JSON.parse(content));
        });
})
program.parse(process.argv);