/**
 * 	• You are given a package.json file which lists the dependencies of the project.  
		○ Each module is a key. For eg: rxjs, tslib, lodash, benchmark, platform
		○ Each module has the following properties:
			§ version - Version of the module to download
			§ requires - Property which contains list of modules this module is dependent on.
		For eg: rxjs is a module with version : 6.4.0 and has 2 dependencies described in "requires" : tslib and lodash
		○ Each dependent module has further dependencies. For eg:  rxjs is dependent on tslib which in turn is dependent on io-ts
	{
		"rxjs": {
			"version": "6.4.0",
			"requires": {
				"tslib": "^1.9.0",
				"lodash": "^4.17.4"
			}
		},
		"tslib": {
			"version": "1.9.3",
			"requires":{
				"io-ts": "2.0.1"
			}
			
		},
		"io-ts": {
			"version": "3.17.11"
		},
		"lodash": {
			"version": "4.17.11"
		},
		"benchmark": {
			"version": "2.1.4",
			"requires": {
				"lodash": "^4.17.4",
				"platform": "^1.3.3"
			}
		},
		"platform": {
			"version": "1.3.5"
		}
	}
	
	Write an algorithm to return the order in which the packages should be downloaded. 

 */

const fs = require('fs');
const Graph = require('./Graph.js').Graph;

// Read the package definition file
const packageDepsStr = readPackageFile();
// Parse the package dependencies into a JS object
const packageDeps = JSON.parse(packageDepsStr);
// construct the graph
const graph = constructGraph(packageDeps);
// Get the package dependencies
console.log(getPackageDependencies(graph));


function constructGraph(packageDeps) {
    const depsGraph = new Graph();
    for (const key in packageDeps) {
        depsGraph.addVertex(key);
        const deps = packageDeps[key].requires;
        for (const dep in deps) {
            depsGraph.addVertex(dep);
            depsGraph.addEdge(key, dep);
        }
    }
    return depsGraph;
}

function getPackageDependencies(depsGraph) {
    return depsGraph.doToplogicalSortUsingKahn().reverse();
}
function readPackageFile() {
    const packageDepsFilePath = require('path').resolve(__dirname, 'package-dep.json');
    const packageDepsStr = fs.readFileSync(packageDepsFilePath, 'utf-8');
    return packageDepsStr;
}

