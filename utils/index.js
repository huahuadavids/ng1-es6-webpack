/**
 * Created by mac on 16/10/26.
 */
function getPicLoader(name){
  var res = {}
  res.test = new RegExp( '\.' + name + '$');
  res.loader = "url-loader";
  res.exclude = new RegExp('(node_modules|bower_components)');
  res.query = {
    'limit': 10000,
    'mimetype': "image/" + (name==='svg'?'svg+xml': name)
  };
  return res;
}

module.exports = getPicLoader;