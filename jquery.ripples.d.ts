declare namespace JQuery {
  interface RipplesOptions {
    resolution?: number;
    dropRadius?: number;
    perturbance?: number;
    interactive?: boolean;
    imageUrl?: string;
  }

  interface JQuery {
    ripples(options?: RipplesOptions): JQuery;
    ripples(method: 'destroy' | 'show' | 'hide' | 'pause' | 'play'): JQuery;
    ripples(method: 'drop', x: number, y: number, radius: number, strength: number): JQuery;
  }
}
