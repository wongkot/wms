import { Component, computed, input } from '@angular/core';
import { BaseChartInput } from '@app/shared/chart/models/base-chart-input';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexStates,
  ApexLegend,
  ApexFill,
  ApexStroke,
} from "ng-apexcharts";

@Component({
  selector: 'app-pie-chart',
  standalone: false,
  templateUrl: './pie-chart-component.html',
  styleUrl: './pie-chart-component.css'
})
export class PieChartComponent {
  private _sectionColor = [
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-info)',
    'var(--color-error)',
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
  ];
  private _sectionTextColor = [
    'var(--color-success-content)',
    'var(--color-warning-content)',
    'var(--color-info-content)',
    'var(--color-error-content)',
    'var(--color-primary-content)',
    'var(--color-secondary-content)',
    'var(--color-accent-content)',
  ];
  chartInput = input.required<BaseChartInput>();
  series = computed<ApexAxisChartSeries>(() => {
    const serie = this.chartInput().chartSeries.length <= 0 ? [] :
      this.chartInput().chartSeries[0].values;
    return serie.map(xy => xy[1]);
  });
  chart = computed<ApexChart>(() => {
    return {
      height: this.chartInput().chartHeight,
      type: 'pie',
      background: 'var(--color-base-100)',
      toolbar: {
        show: false,
      },
    };
  });
  fill = computed<ApexFill>(() => {
    return {
      colors: this._sectionColor,
    };
  });
  labels = computed<string[]>(() => {
    const serie = this.chartInput().chartSeries.length <= 0 ? [] :
      this.chartInput().chartSeries[0].values;
    return serie.map(xy => xy[0]);
  });
  title = computed<ApexTitleSubtitle>(() => {
    return {
      text: this.chartInput().chartTitle,
      align: 'center',
      style: {
        color: 'var(--color-base-content)',
      }
    };
  });
  readonly tooltip: ApexTooltip = {
    custom: function ({ series, seriesIndex, w }) {
      return `
      <div class="bg-base-300 p-2">
        <span class="text-base-content">
          ${Number(series[seriesIndex]).toLocaleString('en-US')} (${w.config.labels[seriesIndex]})
        </span>
      </div>`;
    }
  }
  readonly states: ApexStates = {
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
  readonly legend: ApexLegend = {
    position: 'bottom',
    labels: {
      colors: 'var(--color-base-content)',
    },
    onItemClick: {
      toggleDataSeries: false,
    },
    onItemHover: {
      highlightDataSeries: false,
    },
    formatter(legendName, { seriesIndex, w }) {
      return `${legendName} (${Number(w?.config?.series[seriesIndex] ?? 0).toLocaleString('en-Us')})`;
    },
  };
  dataLabels = computed<ApexDataLabels>(() => {
    return {
      dropShadow: {
        enabled: false,
      },
      style: {
        colors: this._sectionTextColor,
      },
    };
  });
  readonly stroke: ApexStroke = {
    show: false,
  };
}
