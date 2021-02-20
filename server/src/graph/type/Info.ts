import Context from '../Context';

export const Schema = `
	type Info {
		domain: String!
		favicon: ID
		name: String!
		description: String!
	}
`;

export const Resolver = {
	domain: async (_: any, ctx: Context) => (await ctx.db.getSiteData('info')).domain,
	// favicon: async (_: any, ctx: Context) => (await ctx.db.getSiteData('info')).favicon,
	name: async (_: any, ctx: Context) => (await ctx.db.getSiteData('info')).sitename,
	description: async (_: any, ctx: Context) => (await ctx.db.getSiteData('info')).description
};
