import { Component, computed, input } from '@angular/core';
import { BaseChartInput } from '@app/shared/chart/models/base-chart-input';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexStates,
  ApexLegend,
  ApexDataLabels,
  ApexPlotOptions,
} from "ng-apexcharts";

@Component({
  selector: 'app-bar-chart',
  standalone: false,
  templateUrl: './bar-chart-component.html',
  styleUrl: './bar-chart-component.css'
})
export class BarChartComponent {
  public readonly chartInput = input.required<BaseChartInput>();
  public readonly series = computed<ApexAxisChartSeries>(() => {
    return this.chartInput().chartSeries.map(serie => {
      return {
        name: serie.name,
        data: serie.values.map(xy => xy[1]),
        color: serie.color,
      };
    });
  });
  public readonly chart = computed<ApexChart>(() => {
    return {
      height: this.chartInput().chartHeight,
      type: 'bar',
      background: 'var(--color-base-100)',
      toolbar: {
        show: false,
      },
    };
  });
  public readonly title = computed<ApexTitleSubtitle>(() => {
    return {
      text: this.chartInput().chartTitle,
      align: 'center',
      style: {
        color: 'var(--color-base-content)',
      }
    };
  });
  public readonly xAxis = computed<ApexXAxis>(() => {
    const xValues = this.chartInput().chartSeries.length <= 0 ? [] :
      this.chartInput().chartSeries[0].values.map(xy => xy[0]);
    return {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      categories: xValues,
      labels: {
        style: {
          colors: 'var(--color-base-content)',
        }
      },
    };
  });
  public readonly yAxis: ApexYAxis = {
    labels: {
      style: {
        colors: 'var(--color-base-content)',
      }
    }
  };
  public readonly tooltip: ApexTooltip = {
    custom: function ({ series, seriesIndex, dataPointIndex }) {
      return `
      <div class="bg-base-300 p-2">
        <span>${series[seriesIndex][dataPointIndex]}</span>
      </div>`;
    }
  }
  public readonly states: ApexStates = {
    hover: {
      filter: {
        type: 'none',
      }
    },
    active: {
      filter: {
        type: 'none',
      }
    }
  };
  public readonly legend: ApexLegend = {
    position: 'bottom',
    labels: {
      colors: 'var(--color-base-content)',
    },
    onItemClick: {
      toggleDataSeries: false,
    },
    onItemHover: {
      highlightDataSeries: false,
    }
  };
  public readonly grid: ApexGrid = {
    show: true,
    borderColor: 'var(--color-base-300)',
    yaxis: {
      lines: {
        show: true,
      },
    }
  };
  public readonly plotOption: ApexPlotOptions = {
    bar: {
      dataLabels: {
        position: 'top',
      }
    }
  };
  public readonly dataLabels = computed<ApexDataLabels>(() => {
    return {
      style: {
        colors: [({ seriesIndex, dataPointIndex, w }: any) => {
          const value = w.config.series[seriesIndex].data[dataPointIndex];
          if (value <= 0) {
            return 'var(--color-base-content)'; // Show base color if value is zero (avoid low contrast color with background)
          } else {
            return this.chartInput().chartSeries[seriesIndex].dataLabelColor;
          }
        }],
      }
    };
  });
}
