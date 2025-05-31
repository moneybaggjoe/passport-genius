const { available_scopes, scope_docs } = require('../common/constants');

function check_scope(scope){
    const scopes = Array.isArray(scope) ? scope : [scope];
    for (const _scope of scopes) {
        if(!available_scopes.has(_scope)) 
            throw new Error(`"${_scope}" is not a valid scope. See available scopes: ${scope_docs}`);
    }
}

exports = module.exports = {
    check_scope
}