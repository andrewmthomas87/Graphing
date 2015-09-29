
var graph = (function() {

	var formula, submit, graph

	var dots = []

	var initialize = function() {
		var formulaSection = document.querySelector('section#formula')
		formula = formulaSection.querySelector('input')
		submit = formulaSection.querySelector('a')

		submit.addEventListener('click', graph)

		graph = document.querySelector('section#graph')

		for (var i = 0; i < 150; i++) {
			dots[i] = document.createElement('span')
			graph.appendChild(dots[i])
		}
	}

	var graph = function() {
		var width = window.innerWidth
		var height = window.innerHeight

		var computedFormula = formula.value

		while (true) {
			var index = computedFormula.search(/[0-9x][a-z]/) + 1
			if (!index) {
				break
			}
			computedFormula = computedFormula.slice(0, index) + '*' + computedFormula.slice(index)
		}

		while (true) {
			var index = computedFormula.search(/[0-9x\)]\(/) + 1
			if (!index) {
				break
			}
			computedFormula = computedFormula.slice(0, index) + '*' + computedFormula.slice(index)
		}

		computedFormula = computedFormula.replace('sin', 'Math.sin')
		computedFormula = computedFormula.replace('cos', 'Math.cos')
		computedFormula = computedFormula.replace('tan', 'Math.tan')
		computedFormula = computedFormula.replace('min', 'Math.min')
		computedFormula = computedFormula.replace('max', 'Math.max')
		computedFormula = computedFormula.replace('round', 'Math.round')
		computedFormula = computedFormula.replace('random', 'Math.random')
		computedFormula = computedFormula.replace('ceil', 'Math.ceil')
		computedFormula = computedFormula.replace('floor', 'Math.floor')
		computedFormula = computedFormula.replace('sqrt', 'Math.sqrt')

		for (var i = 0, x = -20; i < 150; i++, x += 4/15) {
			dots[i].style.left = Math.floor((i + 0.5) * width / 150) + 'px'
			dots[i].style.bottom = (eval(computedFormula) + (height / 2)) + 'px'
		}
	}

	return {
		initialize
	}

})()

window.addEventListener('load', graph.initialize)
