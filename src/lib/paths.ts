export const appPaths = {
  empty: "/",
  wildcard: "*",
  smoothieList: "/smoothie-list",
  smoothie(id: string) {
    return `${this.smoothieList}/${id}`;
  },
};
