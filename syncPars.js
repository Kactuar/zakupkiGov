var fs = require('fs'); 
var folder = 'C:\\Парсинг\\ЗакупкиГов\\Челяба\\plangraphs\\';
var output = 'C:\\Парсинг\\ЗакупкиГов\\Челяба\\done\\ChlbPlan4.csv';
var result, nameOrg, adress, email, total;
var i = 0; 

fs.readdir(folder, function (err, files) {
  if (err) return console.error(err);
  
  while ( i < files.length) {
  
  result = fs.readFileSync(folder+files[i], 'utf8');

  nameOrg = result.match(/fullName>.+?fullName/) + ';';
  nameOrg = nameOrg.replace(/\&quot\;/g,'\"');
  nameOrg = nameOrg.replace(/\>/,'');
  nameOrg = nameOrg.replace(/\<\//,'');
  nameOrg = nameOrg.replace(/fullName/g,'');
  nameOrg = nameOrg.replace(/oos\:/g,'');
  adress = result.match(/INN\>.+?INN/) + " "; 
  adress = adress.replace(/\;/g,'');
  adress = adress.replace(/INN\>/,'') + ';';
  email = result.match(/email>.+?email/) + ';';
  email = email.replace(/email\>/, '');
  email = email.replace(/\<\/oos\:email/, '');
  email = email.trim();
  total = nameOrg + adress + email + '\n';

  fs.appendFileSync(output, total, 'utf8');

  i++;
  }
});
