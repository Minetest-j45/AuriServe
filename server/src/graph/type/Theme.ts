export default `
	enum ThemeFormat {
		CSS, SASS, SCSS
	}

	type Layout {
		id: ID!
		includes: [String]
		template: String!
	}

	type Theme implements Resource {
		id: ID!
		user: User
		created: Date!

		enabled: Boolean!

		name: String!
		description: String!
		author: String!
		coverPath: String

		layouts: [Layout]!
		format: ThemeFormat!
	}
`;
