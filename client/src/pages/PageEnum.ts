import HomePage from 'pages/HomePage/HomePage';
import CatalogPage from './CatalogPage/CatalogPage';
import AboutPage from './AboutPage/AboutPage';

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

  public static readonly HOME = new PageEnum(
    '/',
    'U.S. Gun Crime Data',
    HomePage
  );
  public static readonly DATA_CATALOG = new PageEnum(
    '/data-catalog',
    'Data Catalog',
    CatalogPage
  );
  public static readonly ABOUT = new PageEnum(
    '/about',
    'About the Data',
    AboutPage
  );
}
