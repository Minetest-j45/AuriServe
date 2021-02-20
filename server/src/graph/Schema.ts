import { buildSchema } from 'graphql';

import Type from './type/Type';
import Resource from './type/Resource';
import TrackModifications from './type/TrackModifications';

import { Schema as Info } from './type/Info';
import Theme from './type/Theme';
import Plugin from './type/Plugin';
import User from './type/User';
import Role from './type/Role';
import Media from './type/Media';
import Page from './type/Page';
import { Schema as Query } from './type/Query';

export default buildSchema([ Type, Resource, TrackModifications,
	Info, Theme, Plugin, User, Role, Media, Page, Query ].join('\n'));
