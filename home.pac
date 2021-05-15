// https://findproxyforurl.com/example-pac-file/

var direct = "DIRECT";
var proxy = "SOCKS5 127.0.0.1:7448";

var rules = [
  "jd.com"
];

function FindProxyForURL(url, host) {

  // If the hostname matches, send direct.
  for (let i = 0; i < rules.length; i++) {
    if (host == rules[i] || host.endsWith('.' + rules[i])) {
      return direct;
    }
  }

  // If the requested website is hosted within the internal network, send direct.
  if (isPlainHostName(host) ||
    shExpMatch(host, "*.local") ||
    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
    isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
    isInNet(dnsResolve(host), "127.0.0.0", "255.255.255.0"))
    return direct;

  // If the IP address of the local machine is within a defined
  // subnet, send to a specific proxy.
  if (isInNet(myIpAddress(), "10.0.0.0", "255.0.0.0") ||
    isInNet(myIpAddress(), "172.16.0.0", "255.240.0.0"))
    return direct;

  // DEFAULT RULE: All other traffic, use below proxies, in fail-over order.
  return proxy;
}
