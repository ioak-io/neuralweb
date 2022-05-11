/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as d3 from 'd3';
import { cloneDeep } from 'lodash';

import './style.scss';
import NoteModel from '../../model/NoteModel';
import NotelinkModel from '../../model/NotelinkModel';
import LinkModel from '../../model/LinkModel';
import NodeModel from '../../model/NodeModel';

const queryString = require('query-string');

interface Props {
  space: string;
  data: { nodes: NodeModel[]; links: LinkModel[] };
}

const THEME: any = {
  DARK_BG: '#202020',
  LIGHT_BG: '#fafafa',
};

const BASE_RADIUS = 25;

const NetworkGraph = (props: Props) => {
  const svgRef = React.useRef<any>(null);
  const divRef = React.useRef(null);
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const companyList = useSelector((state: any) => state.company.items);
  const [data, setData] = useState<any>();
  const [references, setReferences] = useState<any>({});

  const [svg, setSvg] = useState<any>();

  useEffect(() => {
    const dataCopy = cloneDeep(props.data);
    const _data: any = {};
    const validNoteRefList: string[] = [];
    dataCopy.nodes.forEach((item: NodeModel) => {
      validNoteRefList.push(item.reference);
    });
    _data.links = dataCopy.links.filter(
      (item: any) =>
        validNoteRefList.includes(item.source) &&
        validNoteRefList.includes(item.target)
    );
    const nodeCountMap: any = {};
    const _references: any = {};
    _data.links.forEach((item: any) => {
      nodeCountMap[item.source] = (nodeCountMap[item.source] || 0) + 1;
      nodeCountMap[item.target] = (nodeCountMap[item.target] || 0) + 1;
      _references[item.source] = [
        ...(_references[item.source] || []),
        item.target,
      ];
      _references[item.target] = [
        ...(_references[item.target] || []),
        item.source,
      ];
    });
    _data.nodes = dataCopy.nodes;
    // props.data.nodes.forEach((item: NodeModel) => {
    //   if (nodeCountMap[item.reference]) {
    //     _data.nodes.push({
    //       ...item,
    //       weight:
    //         nodeCountMap[item.reference] + 8 <= 120
    //           ? nodeCountMap[item.reference] + 8
    //           : 120,
    //     })
    //   } else
    //   {_data.nodes.push({
    //     ...item,
    //     weight: 9,
    //   })};
    // });
    _data.nodes = dataCopy.nodes.map((item: NodeModel) => {
      if (nodeCountMap[item.reference]) {
        return {
          ...item,
          weight:
            nodeCountMap[item.reference] + BASE_RADIUS - 1 <= 120
              ? nodeCountMap[item.reference] + BASE_RADIUS - 1
              : 120,
        };
      }
      return {
        ...item,
        weight: 9,
      };
    });

    setData(_data);
    setReferences(_references);
  }, [props.data]);

  useEffect(() => {
    console.log('::::', props.data.links);
  }, [props.data]);

  useEffect(() => {
    simulateNetwork();
  }, [profile, data]);

  const simulateNetwork = () => {
    const height = window.innerHeight - 50;
    let width = window.innerWidth - 80 - 40;
    if (profile.sidebar) {
      width -= 350;
    }
    if (profile.contextbar) {
      width -= 350;
    }

    svgRef.current?.setAttribute('height', height);
    svgRef.current?.setAttribute('width', width);
    const svgEl: any = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elementsvar g = svg.append("g")
    const g = svgEl.append('g').attr('class', 'everything');

    const color = d3
      .scaleOrdinal()
      .domain(['note', 'tag'])
      .range(['#4e79a7', '#f28e2c']);
    const colorDisabled = d3
      .scaleOrdinal()
      .domain(['note', 'tag'])
      .range(['#4e79a720', '#f28e2c20']);
    const linkColor = d3
      .scaleOrdinal()
      .domain(['', 'ai', 'link'])
      .range(['#999', '#A500B1', '#DD3D1C']);
    const linkColorDisabled = d3
      .scaleOrdinal()
      .domain(['', 'ai', 'link'])
      .range(['#90909020', '#A500B120', '#DD3D1C20']);
    // const color = d3.scaleOrdinal(nodeGroups, colors);
    const r = 3;
    const _nodes = data?.nodes;
    const _links = data?.links;
    let simulation: any = null;
    let node: any = null;
    let link: any = null;
    if (_nodes) {
      // svgEl
      //   .append('svg:defs')
      //   .selectAll('marker')
      //   .data(['end']) // Different link/path types can be defined here
      //   .enter()
      //   .append('svg:marker') // This section adds in the arrows
      //   .attr('id', String)
      //   .attr('viewBox', '0 -5 10 10')
      //   .attr('refX', 68)
      //   .attr('refY', 0)
      //   .attr('markerWidth', 6)
      //   .attr('markerHeight', 6)
      //   .attr('orient', 'auto')
      //   .append('path')
      //   .attr('d', 'M0,-5L10,0L0,5')
      //   .attr('fill', '#999');
      simulation = d3
        .forceSimulation(_nodes)
        .force('x', d3.forceX(width / 2))
        .force('y', d3.forceY(height / 2))
        .force(
          'link',
          d3
            .forceLink()
            .links(_links)
            .id((d: any) => d.reference)
          // .distance((d: any) => 30 + 30 * (1 - 0.8))
          // .strength(0.1)
        )
        .force('collide', d3.forceCollide(r + 1))
        .force('charge', d3.forceManyBody().strength(-400));

      link = g
        .append('g')
        // .attr('stroke', '#999')
        .attr('stroke-opacity', 0.9)
        .selectAll('line')
        .data(_links)
        .join('line')
        .attr('stroke', function (d: any) {
          return linkColor(d.group);
        })
        .attr('stroke-width', 0.5);
      // .attr('marker-end', 'url(#end)');

      node = g
        .append('g')
        .selectAll('.node')
        .data(_nodes)
        .join('g')
        .attr('class', 'node')
        .style('fill', function (d: any) {
          return color(d.group);
        })
        .call(drag(simulation));

      const text = node
        .append('text')
        .text(function (d: any) {
          return d.name;
        })
        .style('fill', '#aaa')
        .style('font-size', '10px')
        .style('font-weight', '300')
        .attr('x', 10)
        .attr('y', 4);

      node
        .append('circle')
        .attr('r', function (d: any) {
          return Math.sqrt(d.weight || BASE_RADIUS);
        })
        // .attr('fill', '#AE65FF')
        .attr('stroke-width', 1)
        .attr('stroke', '#26465c')
        .attr(
          'stroke',
          profile.theme === 'theme_dark' ? THEME.DARK_BG : THEME.LIGHT_BG
        )
        .on('click', function (d: any, e: any) {
          history.push(`/${props.space}/note?id=${e.reference}`);
        })
        .on('mouseenter', (evt: any, d: any) => {
          link
            .attr('stroke', function (d: any) {
              return linkColorDisabled(d.group);
            })
            .filter(
              (l: any) =>
                l.source.reference === d.reference ||
                l.target.reference === d.reference
            )
            .attr('stroke', function (d: any) {
              return linkColor(d.group);
            });
          node
            .style('fill', function (d: any) {
              return colorDisabled(d.group);
            })
            .filter(
              (n: any) =>
                n.reference === d.reference ||
                (references[d.reference] &&
                  references[d.reference].includes(n.reference))
            )
            .style('fill', function (d: any) {
              return color(d.group);
            });

          text
            .style('fill', '#00000000')
            .filter(
              (t: any) =>
                t.reference === d.reference ||
                (references[d.reference] &&
                  references[d.reference].includes(t.reference))
            )
            .style('fill', '#aaa');
        })
        .on('mouseleave', (evt: any) => {
          // link.attr('display', 'block');
          link.attr('stroke', function (d: any) {
            return linkColor(d.group);
          });
          node.style('fill', function (d: any) {
            return color(d.group);
          });

          text.style('fill', '#aaa');
        });

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
      });

      const zoomHandler = d3.zoom().on('zoom', zoomActions);

      zoomHandler(svgEl);

      // node.on('click', function (d: any, e: any) {
      //   history.push(`/${props.space}/note?id=${e._id}`);
      // });

      setSvg(svgEl);
    }

    function zoomActions(event: any) {
      g.attr('transform', event.transform);
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
  };

  return (
    <div className="network-graph" ref={divRef}>
      <svg ref={svgRef} width={1200} height={600} />
    </div>
  );
};

export default NetworkGraph;
