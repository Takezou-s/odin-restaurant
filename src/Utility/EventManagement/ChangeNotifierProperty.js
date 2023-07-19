// Notifies its value changes by a notifier.

/**
 * Notifies changes on property by notifier.
 * @param {any} owner Owner object.
 * @param {string} propertyName Property name.
 * @param {(sender, property, value) => void} notifier PropertyChangedEvent notifier function.
 * @param {boolean} fireAlways Fires event whether value changed or not.
 * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.
 * @returns
 */
export function ChangeNotifierProperty(owner, propertyName, notifier, fireAlways = false, changedPredicate = null) {
  let _value;
  /**
   * Sets property value and fires event on change.
   * @param {any | (prevValue: any) => any} valueOrFn Property value or callback function with previous value argument.
   */
  const setValue = (valueOrFn) => {
    let value = valueOrFn;
    if (valueOrFn && typeof valueOrFn === "function") {
      value = valueOrFn(_value);
    }
    let changed = (changedPredicate || (() => _value !== value))(_value, value);

    _value = value;
    if (changed || fireAlways) fireChanged();
  };

  /**
   * Sets property value without firing event.
   * @param {any} value Property value.
   */
  const setValueSilent = (value) => {
    _value = value;
  };

  /**
   * Returns property value.
   * @returns any
   */
  const getValue = () => {
    return _value;
  };

  /**
   * Fires event.
   */
  const fireChanged = () => {
    notifier(owner, propertyName, _value);
  };

  return { propertyName, setValue, setValueSilent, getValue, fireChanged };
}

/**
 * Get ChangeNotifierProperty object simpler.
 * @param {any} owner Owner object.
 * @param {(sender, property, value) => void} notifier PropertyChangedEvent notifier function.
 * @returns
 */
export function ChangeNotifierPropertyCreator(owner, notifier) {
  /**
   * Creates ChangeNotifierProperty object.
   * @param {string} propertyName Property name.
   * @param {boolean} fireAlways Fires event whether value changed or not.
   * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.
   * @returns
   */
  const createProperty = (propertyName, fireAlways = false, changedPredicate = null) => {
    return ChangeNotifierProperty(owner, propertyName, notifier, fireAlways, changedPredicate);
  };

  return { createProperty };
}
