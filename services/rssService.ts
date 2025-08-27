import { SecurityAdvisory } from '../types';

export type FeedType = 'all' | 'core' | 'contrib';

const FEED_URLS: Record<FeedType, string> = {
    all: 'https://www.drupal.org/security/all/rss.xml',
    core: 'https://www.drupal.org/security/rss.xml', // Core is the default feed
    contrib: 'https://www.drupal.org/security/contrib/rss.xml'
};

/**
 * Fetches and parses the Drupal security advisories RSS feed based on the selected type.
 * @param feedType The type of feed to fetch ('all', 'core', or 'contrib').
 * @returns A promise that resolves to an array of SecurityAdvisory objects.
 */
export const fetchAdvisories = async (feedType: FeedType = 'all'): Promise<SecurityAdvisory[]> => {
  const url = `https://corsproxy.io/?${encodeURIComponent(FEED_URLS[feedType])}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const errorNode = xmlDoc.querySelector('parsererror');
    if (errorNode) {
      throw new Error('Failed to parse XML');
    }

    const items = Array.from(xmlDoc.querySelectorAll('item'));
    
    const advisories: SecurityAdvisory[] = items.map(item => {
      const getElementText = (selector: string): string => {
          const element = item.querySelector(selector);
          return element?.textContent ?? '';
      };
      
      const getElementTextWithNamespace = (namespace: string, localName: string): string => {
        const element = item.getElementsByTagNameNS(namespace, localName)[0];
        return element?.textContent ?? '';
      };
      
      return {
        id: getElementText('guid'),
        title: getElementText('title'),
        link: getElementText('link'),
        pubDate: getElementText('pubDate'),
        creator: getElementTextWithNamespace('http://purl.org/dc/elements/1.1/', 'creator'),
        description: getElementText('description'),
      };
    });

    return advisories;
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    throw new Error('Could not fetch security advisories. Please check the console for more details.');
  }
};