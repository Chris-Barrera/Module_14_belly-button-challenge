const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json('./samples.json').then(({metadata,samples}) => {

        let meta = metadata.filter(obj => obj.id == choice)[0];
        let samp = samples.filter(obj  => obj.id == choice)[0];

        d3.select('.panel-body').html('');

        Object.entries(meta).forEach(([k,v]) =>{
            d3.select('.panel-body').append('h3').text(`${k.toUpperCase()}: ${v}`)
        })
        
        
        
        console.log(meta, samp);
    })
};

d3.json('./samples.json').then(({names}) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    optionChanged();
});

