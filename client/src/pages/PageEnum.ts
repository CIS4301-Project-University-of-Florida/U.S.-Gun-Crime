import HomePage from 'pages/HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import DataVisualization from './CatalogPage/DataVisualizations/DataVisualizations';
import Rankings from './CatalogPage/Rankings/Rankings';
import DeepDive from './CatalogPage/DeepDive/DeepDive';
import GeographicDistribution from './CatalogPage/GeographicDistribution/GeographicDistribution';

// https://stackoverflow.com/a/51398471/5323344

// Use this enum for consistency across the code base. If we try to hardcode the
// links and the titles for the pages, we could run into some inconsistency issues.
// For example, later on, if we decide the catalog page should be at /catalog instead
// of /data-catalog, we'll have to manually update that across all files that use it.
// This way, we just update it in one place.
export class PageEnum {
  private constructor(
    public readonly url: string,
    public readonly title: string,
    public readonly component: React.ComponentType
  ) {}

  public static readonly HOME = new PageEnum('/', 'U.S. Gun Crimes', HomePage);

  public static readonly ABOUT = new PageEnum(
    '/about',
    'About the Data',
    AboutPage
  );

  public static readonly DATA_VISUALIZATIONS = new PageEnum(
    '/data-visualizations',
    'Data Visualizations',
    DataVisualization
  );

  public static readonly RANKINGS = new PageEnum(
    '/rankings',
    'Rankings',
    Rankings
  );

  public static readonly DEEP_DIVE = new PageEnum(
    '/deep-dive',
    'Data Deep Dive',
    DeepDive
  );

  public static readonly GEOGRAPHIC_DISTRIBUTION = new PageEnum(
    '/geographic-distribution',
    'Geographic Distribution of Gun Crimes',
    GeographicDistribution
  );
}
