var brd1 = JXG.JSXGraph.initBoard('box1', {boundingbox: [-6, 6, 6, -6], grid: true});
var n = brd1.createElement('slider',[[-5,5],[4.5,5],[3,4,96]],{name:'n',snapWidth:1});

var p0 = brd1.create('point',[0,0],{strokeColor:'black',fillColor:'white',name:''});
var p1 = brd1.create('point',[4,0],{strokeColor:'black',fillColor:'white',name:''});
var rot = brd1.create('transform', [function() {return Math.PI*2.0/n.Value();},p0], {type:'rotate'});  // angle, rotation center
var ptmp = brd1.create('point',[0,0],{visible:false,withLabel:false});  // dummy point for the rotation
var cOut = brd1.create('curve',[[0],[0]],{fillColor:'#5e9abf',highlightFillColor:'#5e9abf',fillOpacity:1,highlightFillOpacity:1,strokeColor:'black',highlightStrokeColor:'black'});
var circ = brd1.create('circle',[p0,p1],{fillColor:'#fefd4c',highlightFillColor:'#fefd4c',fillOpacity:0.5,highlightFillOpacity:0.5,strokeColor:'black',highlightStrokeColor:'black'});
var cIn = brd1.create('curve',[[0,1,2],[0,1,2]],{fillColor:'#d769a3',highlightFillColor:'#d769a3',fillOpacity:1,highlightFillOpacity:1,strokeColor:'black',highlightStrokeColor:'black'});

var tCirc = brd1.create('text',[-5,-4.0,function(){
    return 'Area of the circle = ' + (0.0625*circ.getRadius()*circ.getRadius()*Math.PI).toFixed(5);
  }],{fontSize:20});
var tIn = brd1.create('text',[-5,-4.5,function(){
    return 'Area of the inscribed ' +n.Value().toFixed(0)+ '-polygon = ' + (0.0625*n.Value()*circ.getRadius()*circ.getRadius()*Math.sin(Math.PI/n.Value())).toFixed(5);
  }],{fontSize:20});
var tOut = brd1.create('text',[-5,-5,function(){
    return 'Area of the circumscribed  ' +n.Value().toFixed(0)+ '-polygon = ' + (0.0625*n.Value()*circ.getRadius()*circ.getRadius()*Math.tan(Math.PI/n.Value())).toFixed(5);
  }],{fontSize:20});

cIn.updateDataArray = function() {
  var i, len = n.Value();
  this.dataX = [p0.X()+circ.getRadius()];
  this.dataY = [p0.Y()];
  ptmp.setPositionDirectly(JXG.COORDS_BY_USER, [p0.X()+circ.getRadius(), p0.Y()]);
  for (i=0;i<len;i++) {
    rot.applyOnce(ptmp);
    this.dataX.push(ptmp.X());
    this.dataY.push(ptmp.Y());
  }
}

cOut.updateDataArray = function() {
  var i, len = n.Value();
  var s = circ.getRadius()/Math.cos(Math.PI/n.Value());
  this.dataX = [p0.X()+s];
  this.dataY = [p0.Y()];
  ptmp.setPositionDirectly(JXG.COORDS_BY_USER, [p0.X()+s,p0.Y()]);
  for (i=0;i<len;i++) {
    rot.applyOnce(ptmp);
    this.dataX.push(ptmp.X());
    this.dataY.push(ptmp.Y());
  }
}

brd1.update();
