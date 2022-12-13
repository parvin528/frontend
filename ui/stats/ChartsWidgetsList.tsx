import { Box, Grid, GridItem, Heading, List, ListItem } from '@chakra-ui/react';
import React from 'react';

import type { StatsIntervalIds, StatsSection } from 'types/client/stats';

import { apos } from 'lib/html-entities';

import EmptySearchResult from '../apps/EmptySearchResult';
import ChartWidget from './ChartWidget';

type Props = {
  charts: Array<StatsSection>;
  interval: StatsIntervalIds;
}

const ChartsWidgetsList = ({ charts, interval }: Props) => {
  const isAnyChartDisplayed = charts.some((section) => section.charts.some(chart => chart.visible));

  return (
    <Box>
      { isAnyChartDisplayed ? (
        <List>
          {
            charts.map((section) => (
              <ListItem
                display={ section.charts.every((chart) => !chart.visible) ? 'none' : 'block' }
                key={ section.id }
                mb={ 8 }
                _last={{
                  marginBottom: 0,
                }}
              >
                <Heading
                  size="md"
                  mb={ 4 }
                >
                  { section.title }
                </Heading>

                <Grid
                  templateColumns={{
                    lg: 'repeat(2, 1fr)',
                  }}
                  gap={ 4 }
                >
                  { section.charts.map((chart) => (
                    <GridItem
                      key={ chart.id }
                      display={ chart.visible ? 'block' : 'none' }
                    >
                      <ChartWidget
                        id={ chart.id }
                        title={ chart.title }
                        description={ chart.description }
                        interval={ interval }
                      />
                    </GridItem>
                  )) }
                </Grid>
              </ListItem>
            ))
          }
        </List>
      ) : (
        <EmptySearchResult text={ `Couldn${ apos }t find a chart that matches your filter query.` }/>
      ) }
    </Box>
  );
};

export default ChartsWidgetsList;