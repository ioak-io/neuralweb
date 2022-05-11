/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as d3 from 'd3';

import './style.scss';

const queryString = require('query-string');

interface Props {
  data: any;
}

const NetworkGraphSvg = (props: Props) => {
  const svgRef = React.useRef(null);
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const [data, setData] = useState<any>();
  const [links, setLinks] = useState<any[]>([]);

  const [graph, setGraph] = useState<any>();

  useEffect(() => {
    setData({ ...props.data });
  }, [props.data]);

  useEffect(() => {
    const svgEl: any = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elements
    const width = 600;
    const height = 600;
    // const color = d3.scaleOrdinal(d3.schemeCategory10);
    const colors = d3.schemeTableau10;
    // const color = d3.scaleOrdinal(nodeGroups, colors);
    const r = 3;
    const _nodes = data?.nodes;
    const _links = data?.links;
    let simulation: any = null;
    let node: any = null;
    let link: any = null;
    if (_nodes) {
      simulation = d3
        .forceSimulation(_nodes)
        .force('x', d3.forceX(width / 2))
        .force('y', d3.forceY(height / 2))
        .force('collide', d3.forceCollide(r + 1))
        .force('charge', d3.forceManyBody().strength(-200))
        .nodes(_nodes)
        .force('link', d3.forceLink().links(_links))
        .on('tick', ticked);
      link = svgEl
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 1.5)
        .attr('stroke-linecap', 'round')
        .selectAll('line')
        .data(_links)
        .join('line');

      node = svgEl
        .append('g')
        .attr('fill', '#d00690')
        .attr('stroke', '#fff')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(_nodes)
        .join('circle')
        .attr('r', 5)
        .call(drag(simulation));

      node.on('click', function (d: any, e: any) {
        console.log(d, e);
      });
    }

    function ticked() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    }

    function drag(_simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) _simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) _simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    // return Object.assign(svgEl.node(), {scales: {color}});
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={600} height={600} />
      canvas
    </div>
  );
};

export default NetworkGraphSvg;
