#!/usr/bin/env node
import axios from 'axios';
import fs from 'fs';
import inquirer from 'inquirer';

(async () => {
    try {
        const { username } = await inquirer.prompt([
            {
                type: 'input',
                name: 'username',
                message: 'Enter the GitHub username:',
                validate: input => input.trim() !== '' || 'Username cannot be empty'
            }
        ]);

        const url = `https://api.github.com/users/${username}/repos`;

        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'node.js' }
        });

        const repoNames = data.map(repo => repo.name);
        const fileName = `${username}.txt`;

        fs.writeFileSync(fileName, repoNames.join('\n'));

        console.log(`Saved ${repoNames.length} repositories to ${fileName}`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('User not found.');
        } else {
            console.error('Error fetching data:', error.message);
        }
    }
})();
