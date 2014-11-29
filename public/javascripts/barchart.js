var margins = {
	    top: 12,
	    left: 300,
	    right: 24,
	    bottom: 24
	},
	legendPanel = {
	    width: 180
	},
	width = 1200 - margins.left - margins.right - legendPanel.width,
	    height = 350 - margins.top - margins.bottom,
	    dataset = [{
	        data: [{
	            empStatus: 'Employed 30+ hours a week',
	            count: 36.41
	        },
	        {
	            empStatus: 'Employed part-time less than 8 hours per week',
	            count: 36.03
	        },
	        {
	            empStatus: 'Full-time student',
	            count: 35.98
	        },
	        {
	            empStatus: 'Employed 8-29 hours per week',
	            count: 35.91
	        }, 
	        {
	            empStatus: 'Full-time housewife / househusband',
	            count: 35.63
	        },
	        {
	            empStatus: 'Self-employed',
	            count: 35.49
	        },
	        {
	            empStatus: 'In unpaid employment (e.g. voluntary work)',
	            count: 34.66
	        },
	        {
	            empStatus: 'Temporarily unemployed',
	            count: 34.48
	        },
	        {
	            empStatus: 'Other',
	            count: 34.45
	        },
	        {
	            empStatus: 'Part-time student',
	            count: 33.75
	        },
	        {
	            empStatus: 'Prefer not to state',
	            count: 33.39
	        },
	        {
	            empStatus: 'Retired from full-time employment (30+ hours per week)',
	            count: 32.55
	        },
	        {
	            empStatus: 'Retired from self-employment',
	            count: 31.34
	        }
	        
	        ],
	        name: 'Series #1'
	    }

	    ],
	    series = dataset.map(function (d) {
	        return d.name;
	    }),
	    dataset = dataset.map(function (d) {
	        return d.data.map(function (o, i) {
	            // Structure it so that your numeric
	            // axis (the stacked amount) is y
	            return {
	                y: o.count,
	                x: o.empStatus
	            };
	        });
	    }),
	    stack = d3.layout.stack();

	stack(dataset);

	var dataset = dataset.map(function (group) {
	    return group.map(function (d) {
	        // Invert the x and y values, and y0 becomes x0
	        return {
	            x: d.y,
	            y: d.x,
	            x0: d.y0,
	            y0: d.x0
	        };
	    });
	}),
	    svg = d3.select('#barChart')
	        .append('svg')
	        .attr('width', width + margins.left + margins.right + legendPanel.width)
	        .attr('height', height + margins.top + margins.bottom)
	        .append('g')
	        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
	    xMax = d3.max(dataset, function (group) {
	        return d3.max(group, function (d) {
	            return d.x + d.x0;
	        });
	    }),
	    xScale = d3.scale.linear()
	        .domain([0, xMax])
	        .range([0, width]),
	    months = dataset[0].map(function (d) {
	        return d.y;
	    }),
	    _ = console.log(months),
	    yScale = d3.scale.ordinal()
	        .domain(months)
	        .rangeRoundBands([0, height], .1),
	    xAxis = d3.svg.axis()
	        .scale(xScale)
	        .orient('bottom'),
	    yAxis = d3.svg.axis()
	        .scale(yScale)
	        .orient('left'),
	    colours = d3.scale.category10(),
	    groups = svg.selectAll('g')
	        .data(dataset)
	        .enter()
	        .append('g')
	        .style('fill', function (d, i) {
	        return colours(i);
	    }),
	    rects = groups.selectAll('rect')
	        .data(function (d) {
	        return d;
	    })
	        .enter()
	        .append('rect')
	        .attr('x', function (d) {
	        return xScale(d.x0);
	    })
	        .attr('y', function (d, i) {
	        return yScale(d.y);
	    })
	        .attr('height', function (d) {
	        return yScale.rangeBand();
	    })
	        .attr('width', function (d) {
	        return xScale(d.x);
	    })
	        .on('mouseover', function (d) {
	        var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
	        var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;

	        d3.select('#tooltip')
	            .style('left', xPos + 'px')
	            .style('top', yPos + 'px')
	            .select('#value')
	            .text(d.x);

	        d3.select('#tooltip').classed('hidden', false);
	    })
	        .on('mouseout', function () {
	        d3.select('#tooltip').classed('hidden', true);
	    })

svg.append("text")
      .attr("x", function(d) { return xScale(d.x0) - 3; })
      .attr("y", function(d) { return yScale(d.y)/2);})
      .text(function(d) { return d.x; });
});
	    svg.append('g')
	        .attr('class', 'axis')
	        .attr('transform', 'translate(0,' + height + ')')
	        .call(xAxis);

	svg.append('g')
	    .attr('class', 'axis')
	    .call(yAxis);
	
	