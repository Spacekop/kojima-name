import { isNameCategoryReady } from './isReady';
import getAnswerValue from './getAnswerValue';

/*
Name order is like this:

[THE first name] [preCondition] [first name] [Lickable] [last name][-man condition]

[THE first name] contains "The" if user rolled a THE name. [first name] is blank in this case.

[preCondition] is one of
    # Big
    # Old
    # [Body Condition]
There are two conditions that the app won't handle because they are open-ended.

[first name] and [last name] are determined by the naming section

[Lickable] is optional, but only permitted if the user rolled a HORNY name

[-man condition] appends "man" directly to the last name if the user rolled this condition
*/

const categoryNameParts = {
    catNormal: {
        fullName: 'normalFullName'
    },
    catOccupational: {
        firstName: 'occupationalFirstName',
        lastName: 'occupationalLastName'
    },
    catHorny: {
        firstName: 'hornyFirstName',
        lastName: 'hornyLastName',
        middleName: 'hornyLickable'
    },
    catThe: {
        the: 'theFirstName',
        lastName: 'theLastName'
    },
    catCool: {
        firstName: 'coolFirstName',
        lastName: 'coolLastName'
    },
    catViolent: {
        firstName: 'violentFirstName',
        lastName: 'violentLastName'
    },
    catArbitrary: {
        fullName: 'arbitraryFullName'
    }
};

const getNameParts = (state, category) => {
    const nameParts = {};
    const categorySources = categoryNameParts[category];
    Object.keys(categorySources).forEach(part => {
        nameParts[part] = getAnswerValue(state, categorySources[part]);
    });

    return {
        ...nameParts,
        manCondition: getAnswerValue(state, 'manCondition'),
        conditionCondition: getAnswerValue(state, 'conditionCondition')
    };
};

export const formatName = (state, nameCategory) => {
    if (!nameCategory || !isNameCategoryReady(state, nameCategory)) {
        return 'NOT READY';
    }

    const nameParts = getNameParts(state, nameCategory);

    const firstName = nameParts.firstName 
        ? nameParts.firstName + ' '
        : '';
    const fullName = 
        nameParts.fullName || 
        `${firstName}${nameParts.middleName || ''}${nameParts.lastName}`;
    const fullNameMan = `${fullName}${nameParts.manCondition}`

    return [nameParts.the, nameParts.conditionCondition, fullNameMan]
        .filter(p => p).join(' ');
};

export const formatAllNames = state => {
    return Object.keys(categoryNameParts).reduce((acc, nameCategory) => ({
        ...acc,
        [nameCategory]: formatName(state, nameCategory)
    }), {});
}

export const formatPrimaryName = state => 
    formatName(state, getAnswerValue(state, 'nameCategory'));