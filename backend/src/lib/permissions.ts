import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc, memberAc, ownerAc } from 'better-auth/plugins/organization/access'

const statement = {
    ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);
