// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./Multisend.sol";

contract MultisendTest is DSTest {
    Multisend multisend;

    function setUp() public {
        multisend = new Multisend();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
