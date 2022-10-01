import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class SeoService  {
  constructor(private readonly metaTitle: Title,
              private readonly meta: Meta) {
  }

  setTitle(title: string): void {
    this.metaTitle.setTitle(title);
  }

  addTags(tags: Array<MetaDefinition>): void {
    tags.forEach(tag => this.meta.updateTag(tag));
  }
}
