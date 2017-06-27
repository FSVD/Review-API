import { merge } from 'lodash';

import { schemaMap as RootSchemaMap } from './root/root.schema.map';
import { schemaMap as UserSchemaMap } from './user/user.schema.map';
import { schemaMap as ReviewSchemaMap } from './review/review.schema.map';
import { schemaMap as SubjectSchemaMap } from './subject/subject.schema.map';

const schemaMap = merge(RootSchemaMap, UserSchemaMap, ReviewSchemaMap, SubjectSchemaMap);

export default schemaMap;

