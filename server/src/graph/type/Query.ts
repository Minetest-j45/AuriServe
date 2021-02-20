import { Resolver as Info } from './Info';
// import { Resolver as Theme } from './Theme';
// import { Resolver as Plugin } from './Plugin';
// import { Resolver as User } from './User';
// import { Resolver as Role } from './Role';
// import { Resolver as Media } from './Media';
// import { Resolver as Page } from './Page';
// import { Resolver as Query } from './Query';

export const Schema = `
	type Query {
		info: Info!
		themes: [Theme!]!
		plugins: [Plugin!]!
		users: [User!]!
		roles: [Role!]!
		media: [Media!]!
		pages: [Page!]!
	}
`;

export const Resolver = {
	info: Info
};
