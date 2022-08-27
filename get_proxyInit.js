const fs = require('fs');

const getProxy = (name_worker) => {
  
        if (fs.existsSync(`./proxy/${name_worker}.txt`)) {
            let list = fs.readFileSync(`./proxy/${name_worker}.txt`, { encoding: 'utf8', flag: 'r' });
            const proxy = list.split('\n', 100200);
            console.log(proxy[0, 2]);
       return proxy



        } else {
            setTimeout(() => {
              return getProxy(name_worker) 
            }, 1000);
        }


    
}


module.exports = { getProxy }