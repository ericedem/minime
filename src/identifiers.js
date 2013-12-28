var fs = require('fs');
var esprima = require('esprima');
var estraverse = require('estraverse');
var _ = require('underscore');

function identifiers(argv) {
    var filename = argv.f;
    console.log('Processing Identifiers: ', filename);

    var identifiers = [];

    var ast = esprima.parse(fs.readFileSync(filename));
    estraverse.traverse(ast, {
        enter: function (node) {
            if (node.type === "Identifier") {
                var obj = _.findWhere(identifiers, {name: node.name});
                if (obj){
                    obj.size += node.name.length;
                } else {
                    identifiers.push({
                        name: node.name,
                        size: node.name.length
                    });
                }
            }
        }
    });

    identifiers = _.sortBy(identifiers, function(obj){return obj.size;});

    console.log(identifiers);

    var sum = _.reduce(identifiers, function(memo, item){
        return memo + item.size;
    }, 0);

    console.log('sum: ' + sum);
}

module.exports = identifiers;