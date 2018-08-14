var brd = JXG.JSXGraph.initBoard('box', {axis:true, boundingbox: [-5, 5, 5,-5 ]});
var n = brd.create('slider',[[1,3],[3,3],[1,10,150]],{name:'n',snapWidth:1});
var f = function(x){ return Math.sin(x); }
var plot = brd.create('functiongraph',[f], {strokeWidth:1,strokeOpacity:0.3});
var start = -3.0;
var end = 4.0;
var sc = brd.create('curve',[[0],[0]],{strokeWidth:1,strokeColor:'red'});


sc.updateDataArray = function() {
   var i;
   var m = n.Value();
   var d = (end-start)/m;
   this.dataX = [];
   this.dataY = [];
   this.dataX[0] = start;
   this.dataY[0] = f(start);
   for (i=1;i<=m;i++) {
     this.dataX.push(start+i*d);
     this.dataY.push(f(start+(i-1)*d));
     this.dataX.push(start+i*d);
     this.dataY.push(f(start+i*d));
   }
}
var approx = brd.create('curve',[[0],[0]], {strokeColor:'red'});
approx.updateDataArray = function() {
   var i;
   var m = n.Value();
   var d = (end-start)/m;
   this.dataX = [];
   this.dataY = [];
   this.dataX[0] = start;
   this.dataY[0] = f(start);
   for (i=1;i<=m;i++) {
     this.dataX.push(start+i*d);
     this.dataY.push(f(start+i*d));
   }
}

brd.create('text',[-6,-1,function(){
   var i,s,f0,f1;
   var m = n.Value();
   var d = (end-start)/m;
   s = 0.0;
   f0 = f(start);
   for (i=1;i<=m;i++) {
     f1 = f(start+i*d);
     s += Math.sqrt(d*d+(f1-f0)*(f1-f0));
     f0 = f1;
   }
   return 'Length='+s.toFixed(4); }]);
brd.update();
