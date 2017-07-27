/**
 * `js-person`
 * Person data
 *
 * @customElement
 * @polymer
 * @properties: name, surname, secondSurname, fullName, firstLetterName,
 *              birthdate, computedBirthdate, phoneNumber, email
 * @observers: observers
 * @demo demo/index.html
 */
class JsPerson extends Polymer.Element {
  static get is() { return 'js-person'; }
  static get properties() {
    return {
      name: {
        type: String
      },
      surname: {
        type: String
      },
      secondSurname: {
        type: String
      },
      fullName: {
        type: String,
        computed: '_computedName(name, surname, secondSurname)'
      },
      firstLetterName: {
        type: String,
        computed: '_getFirstLetterName(fullName)'
      },
      birthdate: {
        type: Date,
      },
      computedBirthdate: {
        type: String,
        computed: '_computedBirthdate(birthdate)'
      },
      phoneNumber: {
        type: Number
      },
      email: {
        type: String
      }
    };
  }

  /**
   * Define observers
   */
  static get observers() {
    return [
            '_removeEmptyAttr(fullName, computedBirthdate)'
           ];
  }

  /**
   * Returns first letter of the fullName
   * @param fullName
   * @returns {char}
   * @private
   */
  _getFirstLetterName(fullName){
    if (fullName)
      return fullName.substring(0, 1);
    return '';
  }

  /**
   * Returns computed birth date
   * @param birthdate
   * @returns {date}
   * @private
   */
  _computedBirthdate(birthdate) {
    if (birthdate)
      return new Date(birthdate).toLocaleDateString();
    return '';
  }

  /**
   * Returns full name
   * @param name
   * @param surname
   * @param secondSurname
   * @returns {string}
   * @private
   */
  _computedName(name, surname, secondSurname) {
    if (name && surname && secondSurname)
      return `${name} ${surname} ${secondSurname}`;
    else if(name && surname)
      return `${name} ${surname}`;
    else if(name && secondSurname)
      return `${name} ${secondSurname}`;
    else if(name)
      return `${name}`;
    else
      return ``;
  }

  /**
   * If no data, remove property empty
   * @param fullName
   * @param computedBirthdate
   * @private
   */
  _removeEmptyAttr(fullName, computedBirthdate){
    if(fullName && computedBirthdate)
      this.$.person.removeAttribute('empty');
  }
}

window.customElements.define(JsPerson.is, JsPerson);
