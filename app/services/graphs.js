const createVisualization = (data, type = 'line') => {
  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 80, bottom: 80, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.classList.add("xp-chart");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${margin.left}, ${margin.top})`);

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", type === 'line' ? "xpGradient" : "barGradient");
  gradient.setAttribute("x1", type === 'line' ? "0%" : "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", type === 'line' ? "100%" : "0%");
  gradient.setAttribute("y2", type === 'line' ? "0%" : "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#4F46E5");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#4338CA");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);

  const keys = Object.keys(data);
  const values = Object.values(data);
  const maxValue = Math.max(...values);
  const yAxisMax = Math.ceil(maxValue / 50000) * 50000;

  const xScale = type === 'line' 
    ? (x) => (x / (keys.length - 1)) * chartWidth
    : (index) => (index / keys.length) * chartWidth + chartWidth / keys.length / 2;
  
  const yScale = (y) => chartHeight - (y / yAxisMax) * chartHeight;

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", "0");
  xAxis.setAttribute("y1", chartHeight);
  xAxis.setAttribute("x2", chartWidth);
  xAxis.setAttribute("y2", chartHeight);
  xAxis.setAttribute("stroke", "#4b5563");
  g.appendChild(xAxis);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", "0");
  yAxis.setAttribute("y1", "0");
  yAxis.setAttribute("x2", "0");
  yAxis.setAttribute("y2", chartHeight);
  yAxis.setAttribute("stroke", "#4b5563");
  g.appendChild(yAxis);

  const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  xLabel.setAttribute("x", chartWidth / 2);
  xLabel.setAttribute("y", chartHeight + 60);
  xLabel.setAttribute("text-anchor", "middle");
  xLabel.setAttribute("fill", "#4b5563");
  xLabel.textContent = type === 'line' ? "Date" : "Projects";
  g.appendChild(xLabel);

  const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yLabel.setAttribute("x", -chartHeight / 2);
  yLabel.setAttribute("y", -60);
  yLabel.setAttribute("text-anchor", "middle");
  yLabel.setAttribute("transform", "rotate(-90)");
  yLabel.setAttribute("fill", "#4b5563");
  yLabel.textContent = "XP Earned";
  g.appendChild(yLabel);

  if (type === 'line') {
    const linePath = keys
      .map(
        (key, index) =>
          `${index === 0 ? "M" : "L"} ${xScale(index)} ${yScale(data[key])}`
      )
      .join(" ");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", linePath);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "url(#xpGradient)");
    path.setAttribute("stroke-width", "3");
    g.appendChild(path);

    keys.forEach((key, index) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", xScale(index));
      circle.setAttribute("cy", yScale(data[key]));
      circle.setAttribute("r", "4");
      circle.setAttribute("fill", "#4338CA");
      g.appendChild(circle);
    });
  } else {
    const barWidth = Math.min((chartWidth / keys.length) * 0.6, 60); 
    keys.forEach((key, index) => {
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute("x", xScale(index) - barWidth / 2);
      bar.setAttribute("y", yScale(data[key]));
      bar.setAttribute("width", barWidth);
      bar.setAttribute("height", chartHeight - yScale(data[key]));
      bar.setAttribute("fill", "url(#barGradient)");
      g.appendChild(bar);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", xScale(index));
      text.setAttribute("y", yScale(data[key]) - 5);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#4b5563");
      text.classList.add("bar-text");
      text.textContent = formatNumber(data[key]);
      g.appendChild(text);
    });
  }

  keys.forEach((key, index) => {
    if (type === 'line' && index % Math.ceil(keys.length / 6) !== 0 && index !== keys.length - 1) {
      return;
    }

    const tick = document.createElementNS("http://www.w3.org/2000/svg", "g");
    tick.setAttribute("transform", `translate(${xScale(index)}, ${chartHeight})`);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("y2", "5");
    line.setAttribute("stroke", "#4b5563");
    tick.appendChild(line);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("y", "20");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#4b5563");
    text.classList.add("tick-text");

    if (type === 'bar') {
      const words = key.split(/(?=[A-Z])|[\s-]/);
      words.forEach((word, i) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", "0");
        tspan.setAttribute("dy", i === 0 ? "0" : "1.2em");
        tspan.textContent = word;
        text.appendChild(tspan);
      });
    } else {
      text.textContent = key;
    }

    tick.appendChild(text);
    g.appendChild(tick);
  });

  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const tickValue = (yAxisMax / yTicks) * i;
    const tickGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    tickGroup.setAttribute("transform", `translate(0, ${yScale(tickValue)})`);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x2", "-5");
    line.setAttribute("stroke", "#4b5563");
    tickGroup.appendChild(line);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "-10");
    text.setAttribute("dy", "0.32em");
    text.setAttribute("text-anchor", "end");
    text.setAttribute("fill", "#4b5563");
    text.classList.add("tick-text");
    text.textContent = formatNumber(tickValue);
    tickGroup.appendChild(text);

    g.appendChild(tickGroup);
  }

  svg.appendChild(g);
  return svg;
};

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export const initGraphs = async (data) => {
  const xpChartContainer = document.getElementById("xp-chart-container");
  const xpBarContainer = document.getElementById("xp-bar-container");
  const xpPerTimer = {};
  const xpPerProject = {};
  
  data.xpPerProject.forEach((transaction) => {
    if (xpPerProject[transaction.object.name]) {
      xpPerProject[transaction.object.name] += transaction.amount;
    } else {
      xpPerProject[transaction.object.name] = transaction.amount;
    }
  });
  
  data.xpPerTime.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const formatted = date.toISOString().slice(0, 7);
    if (xpPerTimer[formatted]) {
      xpPerTimer[formatted] += transaction.amount;
    } else {
      xpPerTimer[formatted] = transaction.amount;
    }
  });

  const lineChart = createVisualization(xpPerTimer, 'line');
  const barChart = createVisualization(xpPerProject, 'bar');
  
  xpChartContainer.appendChild(lineChart);
  xpBarContainer.appendChild(barChart);
};