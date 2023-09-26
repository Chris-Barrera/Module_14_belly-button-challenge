
const optionChanged = choice => {
    d3.json('./samples.json').then(({ metadata, samples }) => {

        let meta = metadata.filter(obj => obj.id == choice)[0];
        let samp = samples.filter(obj => obj.id == choice)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([k, v]) => {
            d3.select('.panel-body').append('h4').text(`${k.toUpperCase()}: ${v}`)
        });

        const { otu_ids, otu_labels, sample_values } = samp;
        var data = [{
            type: 'bar',
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(x => `OTU ${x}`),
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }];

        Plotly.newPlot('bar', data);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,

            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"

            }
        };

        var data = [trace1];

        Plotly.newPlot('bubble', data);

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b>Washing Frequency</b><br>Per Week" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 9] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);

    });
};


d3.json('./samples.json').then(data => {
    const { names } = data;

    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    optionChanged(names[0]);
});
