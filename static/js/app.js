let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let alldata = d3.json(url);
console.log(alldata);

// Initialized arrays
// let sample_values = [];
// let otu_ids = [];
// let otu_labels = [];

// Command to update the bar chart based on the sample_id
function bar(sample_id) {
  // Fetch JSON data
  d3.json(url).then(function(result) {
    output = result.samples;
    console.log(output);

    // Filter the data based on the sample_id
    let sampledata = output.filter(sample => sample.id === sample_id);
    console.log(sampledata);

    // Update the arrays with the filtered data
    otu_ids = sampledata[0].otu_ids;
    otu_labels = sampledata[0].otu_labels;
    sample_values = sampledata[0].sample_values;

    let trace = {
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    // Create data array
    let traces = [trace];
    let layout = { title: "Top 10" };

    // Create Plotly chart
    Plotly.newPlot("bar", traces, layout);
  });
}

// Fetch JSON data to populate dropdown
d3.json(url).then(function(result) {
  const dropdown = d3.select("#selDataset");
  const sampleIds = result.samples.map(sample => sample.id);

  // Add dropdown options
  dropdown
    .selectAll("option")
    .data(sampleIds)
    .enter()
    .append("option")
    .text(function(d) {
      return d;
    });

  

  // Call the updateBarChart and Bubble chart function with the initial sample_id
  bar(sampleIds[0]);
  bubble(sampleIds[0]);
}).catch(function(error) {
  console.error(error);

});
// Add event listener to the dropdown
// dropdown.on("change", function() {
  // const selectedSample = dropdown.property("value");
 function optionChanged(selectedSample){
  bar(selectedSample);
  bubble(selectedSample);
 }


//Promise pending  BUBBLE CHART
 function bubble(sample_id) {
d3.json(url).then(function(result) {
    output2 = result.samples
    console.log(output2);
    sampledata2 = output2.filter(sample => sample.id === sample_id) 
     console.log(sampledata2)
 // below use the 'selectItem' in place of the [0]
    otu_ids = sampledata2[0].otu_ids;
    otu_labels = sampledata2[0].otu_labels;
    sample_values = sampledata2[0].sample_values;

    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        },
        text: otu_labels
      };
    
      let data = [trace2];
      
      let layout = {
        showlegend: false,
        height: 500,
        width: 1000,
        xaxis: {
          title: 'OTU IDs'
        },
        
      };
    
      Plotly.newPlot("bubble", data, layout);

     let metadataDiv = d3.select("#sample-metadata");
     metadataDiv.html("");
     let alldata = result.metadata;
     let selectedMetadata = alldata.filter(metadata => metadata.id == sample_id)[0];
     Object.entries(selectedMetadata).forEach(([key, value]) => {
       metadataDiv.append("p").text(`${key}: ${value}`);
      });


    });
 
 }
 





