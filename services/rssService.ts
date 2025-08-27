import { SecurityAdvisory } from '../types';

// Using a CORS proxy to fetch the RSS feed from the browser.
// Switched to a different proxy to resolve fetching issues.
const RSS_FEED_URL = 'https://corsproxy.io/?https://www.drupal.org/security/rss.xml';

/**
 * Fetches and parses the Drupal security advisories RSS feed.
 * @returns A promise that resolves to an array of SecurityAdvisory objects.
 */
export const fetchAdvisories = async (): Promise<SecurityAdvisory[]> => {
  try {
    const response = await fetch(RSS_FEED_URL);
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