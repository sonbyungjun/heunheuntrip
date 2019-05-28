var InfiniteGrid = eg.InfiniteGrid;
var GridLayout = InfiniteGrid.GridLayout;

var app = $('.app');
const ig = new eg.InfiniteGrid(app, {
	isConstantSize: true,
	transitionDuration: 0.2,
});
ig.setLayout(eg.InfiniteGrid.GridLayout, {align: "center", margin: 3});
ig.layout(true);