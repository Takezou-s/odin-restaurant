/**
 * Returns a listener object for PropertyChangedEvent.
 * @returns
 */
export function PropertyChangedListener() {
  /**
   * Listens event when both owner and property/predicate matches.
   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.
   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.
   * @param {any} propOwner Expected owner of property/event.
   * @param {string | (sender: any, property: string) => boolean} propNameOrPredicate Expected property name or predicate to check if listener function should be called.
   */
  const listen = (subscriptionFn, listenerFn, propOwner, propNameOrPredicate) => {
    const checkSender = (sender) => {
      return sender && propOwner ? propOwner === sender : true;
    };

    const checkProperty = (property) => {
      return !propNameOrPredicate || propNameOrPredicate === "__any__" ? true : propNameOrPredicate === property;
    };

    const predicate = propNameOrPredicate
      ? Object.prototype.toString.call(propNameOrPredicate) === "[object String]"
        ? (sender, property) => checkSender(sender) && checkProperty(property)
        : propNameOrPredicate
      : () => true;

    // let predicate = () => true;
    // if (propNameOrPredicate) {
    //     if(Object.prototype.toString.call(propNameOrPredicate) === "[object String]")
    //     {
    //         predicate = (sender, property) => checkSender(sender) && checkProperty(property);
    //     }
    //     else
    //     {
    //         predicate = propNameOrPredicate;
    //     }
    // }

    subscriptionFn(_getWrappedListener(listenerFn, predicate));
  };

  /**
   * Listens any property value changed when owner matches.
   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.
   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.
   * @param {any} propOwner Expected owner of property/event.
   */
  const listenOwnersAnyProperty = (subscriptionFn, listenerFn, propOwner) => {
    listen(subscriptionFn, listenerFn, propOwner);
  };

  /**
   * Listens event when property/predicate matches.
   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.
   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.
   * @param {string | (sender: any, property: string) => boolean} property Expected property name or predicate to check if listener function should be called.
   */
  const listenProperty = (subscriptionFn, listenerFn, property) => {
    listen(subscriptionFn, listenerFn, null, property);
  };

  /**
   * Listens event always.
   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.
   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.
   */
  const listenAnyProperty = (subscriptionFn, listenerFn) => {
    listen(subscriptionFn, listenerFn, null, null);
  };

  const _getWrappedListener = (listenerFn, predicate) => {
    return (sender, property, value) => {
      if (predicate(sender, property)) {
        listenerFn(sender, property, value);
      }
    };
  };

  return { listen, listenOwnersAnyProperty, listenProperty, listenAnyProperty };
}
